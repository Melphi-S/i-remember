export default {
  auth: {
    unauthorized: 'Пользователь не найден или неверный пароль',
    notVerified: 'User is not verified by email',
    alreadyVerified: 'User is already verified by email',
  },
  users: {
    notFound: 'User is not found',
    notUnique: 'Пользователь с таким e-mail уже зарегистрирован',
    noId: 'Не передан id пользователя',
    wrongCode: 'Code is incorrect or expired',
  },
  vocabularies: {
    alreadyCreated: 'This user has already created a dictionary',
    notFound: 'Vocabulary is not found',
    forbidden: 'Vocabulary user id is incorrect',
    wordNotFound: 'Word is not found in the vocabulary',
    maxStatus: 'It is not possible to increase the maximum status',
    minStatus: 'It is not possible to decrease the minimum status',
    alreadyBanned: 'Word is already banned',
  },
  dbCodes: {
    notUnique: '23505',
  },
};
