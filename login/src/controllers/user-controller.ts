import { RequestHandler } from "express";
import createHttpError from "http-errors";
import userModel from '../models/user-model';
import bcrypt from "bcrypt";
import session from 'express-session';

interface newUser {
    username?: string,
    password?: string
}

export const getUsers: RequestHandler = async (req, res, next) => {
    try {
        const users = await userModel.find().exec();
        res.status(200).json(users);
    } catch (error) {
        next(error)
    }
}

export const createUser: RequestHandler<unknown, unknown, newUser, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "missing parameters");
        }
        const existingUsername = await userModel.findOne({ username: username }).exec();

        if (existingUsername) {
            throw createHttpError(409, "This username is already registered. Please log in with your credentials or try a new username.");
        }

        const newUser = await userModel.create({
            username: username,
            password: password
        });

        res.status(201).json(newUser);

    } catch (error) {
        next(error);
    }
}

interface Login {
    username?: string,
    password?: string
}

export const login: RequestHandler<unknown, unknown, Login, unknown> = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;
    try {
        if (!username || !password) {
            throw createHttpError(400, "Username or Password missing.");
        }

        const user = await userModel.findOne({ username }).select("+password").exec();
        if (!user) {
            throw createHttpError(401, "Invalid credentialini.");
        }

        if(password != user.password) {
            throw createHttpError(401, "Invalid credential!.")
        }

        res.status(200).json(user);

    } catch (error) {
        next(error)
    }

}