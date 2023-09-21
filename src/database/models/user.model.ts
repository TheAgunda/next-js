import mongoose, { Schema, model, models, Types, Document } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';

export interface IUser extends Document {
    name?: string;
    username: string;
    email: string;
    password: string;
    isDeleted?: boolean;
    isVerified: boolean;
    isActivated: boolean;
    verifyToken: string;
    verifyTokenExpiry: Date;
    forgotPasswordToken: string;
    forgotPasswordExpiry: Date;
}

export interface IUserModel extends IUser {
    comparePassword(password: string, cb: (error: Error | undefined, isMatch: boolean) => void): any;
    hidePasswordAndAddTokens(accessToken: string, refreshToken: string): IUserModel;
}

const UserSchema = new Schema<IUser, IUserModel>(
    {
        name: { type: String },
        username: {
            type: String, required: true,
        },
        email: {
            type: String, lowercase: true, index: true, required: true,
        },
        password: {
            type: String, max: 1024, required: true
        },
        isDeleted: { type: Boolean, default: false, select: false },
        isVerified: {
            type: Boolean, default: false
        },
        isActivated: {
            type: Boolean, default: false,
        },
        verifyToken: {
            type: String,
        },
        verifyTokenExpiry: {
            type: Date,
        },
        forgotPasswordToken: {
            type: String,
        },
        forgotPasswordExpiry: {
            type: Date,
        }
    },
    {
        timestamps: true
    }
);
UserSchema.pre<IUserModel>('save', function (_next) {
    const user = this;
    if (!user.isModified('password')) {
        return _next();
    }
    genSalt(10, (error, salt) => {
        if (error) {
            return _next(error);
        }
        hash(user.password, salt, (error, passwordHash) => {
            if (error) {
                return _next(error);
            }
            user.password = passwordHash;
            return _next();
        });
    });
});
UserSchema.set('toObject', { virtuals: true });
UserSchema.set('toJSON', { virtuals: true });
UserSchema.methods.comparePassword = function (requestPassword: string, cb: (error: Error | undefined, isMatch: boolean) => void): any {
    compare(requestPassword, this.password, (error, isMatch) => {
        return cb(error, isMatch);
    });
};
/**
 * 
 * @param accessToken Add accessToken in user ojbect
 * @param refreshToken Add refreshToken in user ojbect
 * @returns 
 */
UserSchema.methods.hidePasswordAndAddTokens = function (accessToken: any, refreshToken: any) {
    const user = this.toObject();
    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    delete user.password;
    return user;
}

const User = models.User || model<IUserModel, IUser>("User", UserSchema);
export default User;