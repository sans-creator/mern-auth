import userModel from "../models/userModels.js"
import bcrypt from 'bcryptjs'  //for encrypting
import jwt from 'jsonwebtoken'
import trasnporter from "../config/nodemailer.js";


export const register = async (req, res) => {
  console.log("BODY:", req.body);
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.json({
      success: false,
      message: 'Missing details'
    });
  }

  try {
  const existingUser = await userModel.findOne({ email });

  if (existingUser) {
    return res.json({
      success: false,
      message: 'User already exists',
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new userModel({
    name,
    email,
    password: hashedPassword,
  });

  await user.save();

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });

  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  //Wrap sendMail separately
try {
  const mailOptions = {
    from: `"sanskar" <${process.env.SENDER_EMAIL}>`,

    to: email,
    subject: 'Welcome to Auth',
    text: `Welcome to our website. Your account has been created with email id ${email}`,
  };

  const info = await trasnporter.sendMail(mailOptions);
  console.log("✅ Email sent successfully. Message ID:", info.messageId);
} 
catch (emailErr) {
  console.error("❌ Email sending failed:", emailErr);
}
  
    // Optional: continue without failing registration
  

  // Safe to send response now
  return res.json({
    success: true,
    message: 'User registered successfully',
  });
} catch (error) {
  console.error("Registration error:", error.message);
  return res.status(500).json({
    success: false,
    message: error.message,
  });
}
}


export const login= async (req,res)=>{

    const {email,password}=req.body
    if(!email || !password){
        return res.json(
            {
                success:false,
                message:'Missing details'
            }
        )
            
    }

    try {
        const user=await userModel.findOne({email})
        if(!user){
            return res.json(
                {
                    success:false,
                    message:'User not found.Inavlid Email'
                }
            )
        }

        const isMatch=await bcrypt.compare(password,user.password)

        if(!isMatch){
            return res.json(
                {
                    success:false,
                    message:'Invalid Password'
                })   
            }    


         //create the tokens for login function
                const token=jwt.sign({
                id:user._id
            },
            process.env.JWT_SECRET,
            {
                expiresIn:'7d'
            }

        )
            //sending token in response
        res.cookie('token',token,{
            httpOnly:true , //onlyhttp req can access this cookie
            secure: process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',  // for localhost we use strict as in local develpoment ronetend and backeend run on local host . but for live server frontend and backend are on other domain name
            maxAge:7*24*60*60*1000 //expire in 7 days(time in milliseconds)
        })

        return res.json(
            {
                success:true,
                message:'User logged in successfully'
            }
        )

        
    } catch (error) {
        res.json(
            {
                success:false,
                message:error.message
            }
        )
        
    }



}

export const logout= async(req,res)=>{

    try {
        //clear cookir fronm response
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV==='production',
            sameSite:process.env.NODE_ENV==='production'?'none':'strict',

        })
        return res.json(
            {
                success:true,
                message:'User logged out successfully'
            }
        )
        
    } catch (error) {
        return res.json(
            {
                success:false,
                message:error.message
            }
        )
        
    }

}
//send verification Otp
export const sendVerifyOtp=async(req,res)=>{
  try{
    const {userId}=req.body;
    const user=await userModel.findById(userId);


    if(user.isAccountVerified){
      return res.json(
        {
          success:false,
          message:'Account already verified'
        }
      )

    }
    //using mathrandom to generateotp 6 digit
    const otp=String(Math.floor(100000+Math.random()*900000))
    
    user.verifyOtp=otp;
    user.verifyOtpExpiredAt=Date.now()+24*60*60*1000;
    await user.save();

    const mailOptions={
      from: `"sanskar" <${process.env.SENDER_EMAIL}>`,

      to: user.email,
      subject: 'Account Verification Otp ',
      text: `Your otp is {otp}. Verify yournaccount using it :)`,
    }

    await trasnporter.sendMail(mailOptions)
    

    res.json(
      {
        success:true,
        message:'Otp sent successfully'
      }
    )



  }catch(error){
    return res.json(
      {
        success:false,
        message:error.message
      })
    }
}

