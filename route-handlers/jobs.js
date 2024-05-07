const Job = require('../models/job');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

/**
 * 获取所有工作
 */
const getJobs = async (req, res) => {
   const jobs = await Job.find({ createdBy: req.user.userId });
   res.status(StatusCodes.OK).json({ list: jobs, total: jobs.length });
};

/**
 * 获取单个工作
 */
const getJob = async (req, res) => {
   const job = await Job.find({
      _id: req.params.id,
      createdBy: req.user.userId,
   });
   if (!job) {
      throw new NotFoundError(`No job with id ${req.params.id}`);
   }
   res.status(StatusCodes.OK).json({ job });
};

/**
 * 创建工作
 */
const createJob = async (req, res) => {
   const job = await Job.create({ ...req.body, createdBy: req.user.userId });
   res.status(StatusCodes.CREATED).json({
      company: job.company,
      position: job.position,
   });
};

/**
 * 删除工作
 */
const removeJob = async (req, res) => {
   const job = await Job.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user.userId,
   });
   if (!job) {
      throw new NotFoundError(`Faild to remove job with id ${req.params.id}`);
   }
   res.status(StatusCodes.OK).json({
      company: job.company,
      position: job.position,
      status: job.status,
   });
};

/**
 * 更新工作
 */
const updateJob = async (req, res) => {
   const job = await Job.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user.userId },
      req.body,
      {
         new: true,
         runValidators: true,
      }
   );
   if (!job) {
      throw new NotFoundError(`Faild to update job with id ${req.params.id}`);
   }
   res.status(StatusCodes.OK).json({
      company: job.company,
      position: job.position,
      status: job.status,
   });
};

module.exports = {
   getJobs,
   getJob,
   createJob,
   removeJob,
   updateJob,
};
