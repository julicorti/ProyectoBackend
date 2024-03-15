import UserDTO from "../../dao/dtos/user.dto.js";

export const getCurrentUser = (req, res) =>{
    const user = UserDTO(req.user);
    res.send(user.getCurrentUser());
}