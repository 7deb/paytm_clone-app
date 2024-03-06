const express = require("express");
const zod = require("zod");
const { JWT_SECRET } = require("../config");
const { User } = require("../db");
const jwt = require("jsonwebtoken");
const { authMiddleware } = require("../middleware");

const router = express.Router();

const signupBody = zod.object({
    email: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),
});

const updateBody = zod.object({
    password : zod.string().optional(),
    firstname: zod.string().optional(),
    lastname: zod.string().optional,
})

router.put("/",authMiddleware,async (req,res)=>{
    const { success } = updateBody.safeParse(req.body);
    
    if(!success){
        res.status(411).json({
            message:"internal server issue!!"
        })
    }

    await User.updateOne({_id: req.userId},req.body);
    res.json({
        message:"user updated succesfully!!"
    })


})
router.post("/signup", async (req, res) => {
    try {
        const success = signupBody.safeParse(req.body);
        if (!success) {
            return res.status(411).json({
                message: "Email already taken or wrong input",
            });
        }

        const existingUser = await User.findOne({
            email:req.body.email,
        });

        if (existingUser) {
            return res.status(411).json({
                message: "User already exists",
            });
        }

        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
        });

        const userId = user._id;

        const token = jwt.sign({
            userId
        }, JWT_SECRET);

        res.json({
            message: "User created successfully",
            token: token,
        });

    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;