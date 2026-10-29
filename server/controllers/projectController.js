import projectModel from "../models/Project.js";
import { generateProjectEvaluation } from "../services/geminiService.js";

const addProject = async (req, res) => {
    try {
        const {studentName,studentEmail,title,description,technologies,githubUrl} = req.body;

        const project = await projectModel.create({studentName,studentEmail,title,description,technologies,githubUrl});

        res.json({success: true, message: "Project submitted successfully", project});

    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message});
    }
};

const generateEvaluation = async (req, res) => {
    try {

        const { id } = req.params;

        if (!id) {
            return res.json({
                success: false,
                message: "Project ID is required"
            });
        }

        // Find Project
        const project = await projectModel.findById(id);

        if (!project) {
            return res.json({
                success: false,
                message: "Project not found"
            });
        }

        // Check Evaluation Status
        if (project.evaluationStatus === "evaluating") {
            return res.json({
                success: false,
                message: "Project evaluation is already in progress"
            });
        }

        // Update Evaluation Status
        project.evaluationStatus = "evaluating";
        await project.save();

        // Generate AI Evaluation
        const evaluation = await generateProjectEvaluation({
            title: project.title,
            description: project.description,
            technologies: project.technologies,
            githubUrl: project.githubUrl
        });

        // Save Evaluation Results
        project.score = evaluation.score;
        project.strengths = evaluation.strengths;
        project.improvements = evaluation.improvements;
        project.suggestions = evaluation.suggestions;
        project.evaluationStatus = "evaluated";

        await project.save();

        res.json({success: true,message: "Project evaluated successfully",project});

    } catch (error) {
        console.log(error);
        res.json({success: false,message: error.message});
    }
};

const getAllProjects = async (req, res) => {
    try {

        const projects = await projectModel.find().sort({ score: -1, createdAt: -1 });

        res.json({success: true,message: "Projects fetched successfully",totalProjects: projects.length,projects});

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: error.message});
    }
};

// Get a single project by ID
const getProjectById = async (req, res) => {
    try {
        const { id } = req.params

        const project = await projectModel.findById(id)

        if (!project) {
            return res.status(404).json({ success: false, message: 'Project not found'})
        }

        res.status(200).json({success: true, message: 'Project fetched successfully', project})

    } catch (error) {
        console.log(error)

        // Handle invalid MongoDB ObjectId
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false,message: 'Invalid project ID'})
        }

        res.status(500).json({success: false,message: 'Failed to fetch project'})
    }
}


export { addProject, generateEvaluation, getAllProjects, getProjectById };