export default {
  auth: {
    unauthorized: 'The user was not found or the password is incorrect',
    notVerified: 'The user is not verified by email',
    alreadyVerified: 'The user is already verified by email',
    wrongAdminPass: 'Only for admins',
  },
  users: {
    notFound: 'The user is not found',
    notUnique: 'A user with such e-mail has already been registered',
    noId: 'The user id was not passed',
    wrongCode: 'The code is incorrect or expired',
  },
  vocabularies: {
    alreadyCreated: 'This user has already created a dictionary',
    notFound: 'The vocabulary is not found',
    forbidden: 'The vocabulary user id is incorrect',
    wordNotFound: 'The word is not found in the vocabulary',
    maxStatus: 'It is not possible to increase the maximum status',
    minStatus: 'It is not possible to decrease the minimum status',
    alreadyBanned: 'The word is already banned',
    alreadyAccepted: 'The word is already accepted',
  },
  dbCodes: {
    notUnique: '23505',
  },
};
