const express = require("express")
const router = express.Router();
const Jobs = require("../models/job")
const verifyjwt = require("../middleware/middleware")


router.post("/job-post", async (req, res) => {
    try {
        const {
            companyName,
            logoUrl,
            position,
            salary,
            jobType,
            remote,
            location,
            description,
            about,
            skills,
            recruiterName
        } = req.body;

        if (
            !companyName ||
            !logoUrl ||
            !position ||
            !salary ||
            !jobType ||
            !remote ||
            !location ||
            !description ||
            !about ||
            !skills ||
            !recruiterName
        ) {
            return res.send({ message: "all fields are required" })
        }




        const jobPost = new Jobs({
            companyName,
            logoUrl,
            position,
            salary,
            jobType,
            remote,
            location,
            description,
            about,
            skills,
            recruiterName
        })
        await jobPost.save();
        res.send({ message: "Job details added successfully" })
    }
    catch (error) {
        console.log(error)
    }
});


module.exports = router;