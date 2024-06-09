
import UserModel from '../model/userModel.js'

export const checkPermission = (resource, action) => {
    return async (req, res, next) => {
        try {

            const user = await UserModel.findById(req.user).populate({
                path: 'group',
                model: 'Group',
                populate: {
                    path: 'permissions',
                    model: 'Permission'
                }
            })

            if (!user) return res.status(401).send('User not found');

            // Check if the user has the required permission
            let hasPermission = false

            for (let group of user.group) {
                for (let permission of group.permissions) {
                    if (permission.resource === resource && permission.action === action) {
                        hasPermission = true
                        break
                    }
                }
                if (hasPermission) break
            }

            if (!hasPermission) return res.status(403).send(`You Don't Have Permission In this API`)

            next(); // Add this line to proceed to the next middleware/controller


        } catch (error) {
            res.status(500).send('Server Error')
        }
    }
}