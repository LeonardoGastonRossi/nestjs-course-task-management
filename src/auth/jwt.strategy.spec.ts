import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { Test } from '@nestjs/testing';
import { User } from './user.entity';
import { UnauthorizedException } from '@nestjs/common';

const mockUserRepository = () => ({
  findOne: jest.fn(),
});

describe('jwtStrategy', () => {
  let jwtStrategy: JwtStrategy;
  let userRepository: UserRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    jwtStrategy = await module.get<JwtStrategy>(JwtStrategy);
    userRepository = await module.get<UserRepository>(UserRepository);
  });

  describe('validate', () => {
    it('validates and returns the user based on the JWT payload', async () => {
      const user = new User();
      user.username = 'TestUser';

      (userRepository.findOne as any).mockResolvedValue(user);

      const result = await jwtStrategy.validate({ username: 'TestUser' });
      expect(userRepository.findOne).toHaveBeenCalledWith({
        username: 'TestUser',
      });

      expect(result).toEqual(user);
    });

    it('throws an unauthorized expection as user cannot be found', async () => {
      (userRepository.findOne as any).mockResolvedValue(null);

      expect(jwtStrategy.validate({ username: 'TestUser' })).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
