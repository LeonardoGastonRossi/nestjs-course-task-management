import * as bcrypt from 'bcryptjs';
import { User } from './user.entity';

describe('User entity', () => {
  let user: User;

  beforeEach(() => {
    user = new User();
    user.password = 'testHashPassword';
    user.salt = 'testSalt';
    (bcrypt as any).hash = jest.fn();
  });
  describe('validatePassword', () => {
    it('returns true as password is valid', async () => {
      (bcrypt.hash as any).mockReturnValue('testHashPassword');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('123456');

      expect(bcrypt.hash).toHaveBeenCalledWith('123456', 'testSalt');
      expect(result).toEqual(true);
    });

    it('returns false as password is invalid', async () => {
      (bcrypt.hash as any).mockReturnValue('wrongHashPassword');

      expect(bcrypt.hash).not.toHaveBeenCalled();

      const result = await user.validatePassword('6666');

      expect(bcrypt.hash).toHaveBeenCalledWith('6666', 'testSalt');
      expect(result).toEqual(false);
    });
  });
});
