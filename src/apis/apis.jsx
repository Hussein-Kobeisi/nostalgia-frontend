export const mainRoute = 'http://127.0.0.1:8000'
export const mainApiRoute = mainRoute + '/api'

export const loginApi = mainApiRoute + '/login'                                       //POST
export const signupApi = mainApiRoute + '/register'                                   //POST
export const logoutApi = mainApiRoute + '/logout'                                           //POST + jwt

export const getUsersApi = mainApiRoute + '/users'                                          //get
export const updateUserApi = mainApiRoute + '/add_update_user'                              //POST + jwt
export const deleteUserApi = mainApiRoute + '/delete_user'                                  //POST + jwt

export const getPublicCapsulesApi = mainApiRoute + '/capsules'                        //Get
export const getPublicCapsuleByIdApi = mainApiRoute + '/capsules/id/'                 //Get

export const getUserCapsulesApi = mainApiRoute + '/capsules/user'                           //Get + jwt
export const addOrUpdateCapsuleApi = mainApiRoute + '/add_update_capsule'                   //POST + jwt
export const deleteCapsuleByIdApi = mainApiRoute + '/delete_capsule/'                       //POST + jwt
export const deleteUserCapsulesByIdApi = mainApiRoute + '/delete_capsule/user'              //POST + jwt

export const getMediaByIdApi = mainApiRoute + '/capsule_media/id/'                    //Get
export const getMediaByCapsuleIdApi = mainApiRoute + '/capsule_media/capsule/'        //Get

export const addOrUpdateMediaApi = mainApiRoute + '/add_capsule_media'                      //POST + jwt
export const deleteMediaByIdApi = mainApiRoute + '/delete_capsule_media/'                   //POST + jwt
export const deleteMediaByCapsuleIdApi = mainApiRoute + '/delete_capsule_media/capsule/'    //POST + jwt

