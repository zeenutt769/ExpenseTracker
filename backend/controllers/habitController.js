const Habit = require("../models/Habit");

exports.addHabit = async (req, res) => {
  const habit = await Habit.create(req.body);
  res.json(habit);
};

exports.getHabits = async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
};
