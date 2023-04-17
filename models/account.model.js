const { DataTypes, Model } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        email: { type: DataTypes.STRING(50), allowNull: false },
        passwordHash: { type: DataTypes.STRING, allowNull: false },        
        firstName: { type: DataTypes.STRING(100), allowNull: false },
        lastName: { type: DataTypes.STRING(100), allowNull: false },
        acceptTerms: { type: DataTypes.BOOLEAN },
        emailverificationToken: { type: DataTypes.STRING },
        emailverified: { type: DataTypes.DATE },
        mobile: { type: DataTypes.NUMBER },
        mobileOTP: { type: DataTypes.NUMBER },
        mobileOTPExpires: { type: DataTypes.DATE },
        resetToken: { type: DataTypes.STRING },
        resetTokenExpires: { type: DataTypes.DATE },
        passwordReset: { type: DataTypes.DATE },
        created: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        updated: { type: DataTypes.DATE },
        isVerified: {
            type: DataTypes.VIRTUAL,
            get() { return !!(this.emailverified || this.passwordReset); }
        }
    };

    const options = {
        // disable default timestamp fields (createdAt and updatedAt)
        timestamps: false,
        defaultScope: {
            // exclude password hash by default
            attributes: { exclude: ['passwordHash'] }
        },
        scopes: {
            // include hash with this scope
            withHash: { attributes: {}, }
        }
    };
    return sequelize.define('account', attributes, options);

}