import cron from 'node-cron';
import User from '../models/auth.js';

export const resetQuestionCount = async () => {
  try {
    // Reset question count to zero for all users
    await User.updateMany({}, { noOfQuestions: 0 });
    console.log('Question count reset successfully.');
  } catch (error) {
    console.error('Failed to reset question count:', error);
  }
};

export const resetSubscription = async () => {
  try {
    // Calculate the date one month ago
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Reset subscription to null for users whose subscription is older than one month
    await User.updateMany({ subscription: { $lt: oneMonthAgo } }, { subscription: null });
    console.log('Subscription reset successfully.');
  } catch (error) {
    console.error('Failed to reset subscription:', error);
  }
};

export const startCronJobs = () => {
  cron.schedule('0 0 * * *', resetQuestionCount); // Reset question count daily
  cron.schedule('0 12 * * *', resetSubscription); // Reset subscription monthly
};
