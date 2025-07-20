export const mainApiRoute = 'http://127.0.0.1:8000/api/'

export const loginApi = mainApiRoute + 'guest/login'                                       //POST
export const signupApi = mainApiRoute + 'guest/register'                                   //POST
export const logoutApi = mainApiRoute + 'logout'                                           //POST + jwt

export const updateUserApi = mainApiRoute + 'add_update_user'                              //POST + jwt
export const deleteUserApi = mainApiRoute + 'delete_user'                                  //POST + jwt

export const getPublicCapsulesApi = mainApiRoute + 'guest/capsules'                        //Get
export const getPublicCapsuleByIdApi = mainApiRoute + 'guest/capsules/id/'                 //Get

export const getUserCapsulesApi = mainApiRoute + 'capsules/user'                           //Get + jwt
export const addOrUpdateCapsuleApi = mainApiRoute + 'add_update_capsule'                   //POST + jwt
export const deleteCapsuleByIdApi = mainApiRoute + 'delete_capsule/'                       //POST + jwt
export const deleteUserCapsulesByIdApi = mainApiRoute + 'delete_capsule/user'              //POST + jwt

export const getMediaByIdApi = mainApiRoute + 'guest/capsule_media/id/'                    //Get
export const getMediaByCapsuleIdApi = mainApiRoute + 'guest/capsule_media/capsule/'        //Get

export const addOrUpdateMediaApi = mainApiRoute + 'addOrUpdate'                            //POST + jwt
export const deleteMediaByIdApi = mainApiRoute + 'delete_capsule_media/'                   //POST + jwt
export const deleteMediaByCapsuleIdApi = mainApiRoute + 'delete_capsule_media/capsule/'    //POST + jwt

