import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
    let service: UserService;
    let repository: Repository<User>;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserService,
                {
                    provide: getRepositoryToken(User),
                    useClass: Repository,
                },
            ],
        }).compile();

        service = module.get<UserService>(UserService);
        repository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a user', async () => {
            const user = new User();
            user.name = 'Thomas Turbante';
            user.email = 'roxo@gorilla.com';
            user.password = 'password123';

            jest.spyOn(repository, 'save').mockResolvedValue(user);

            expect(await service.create(user)).toBe(user);
        });
    });

    describe('findAll', () => {
        it('should return an array of users', async () => {
            const users = [new User()];
            jest.spyOn(repository, 'find').mockResolvedValue(users);

            expect(await service.findAll()).toBe(users);
        });
    });

    describe('findOne', () => {
        it('should return a user by id', async () => {
            const user = new User();
            user.id = 1;
            user.name = 'Thomas Turbante';
            user.email = 'roxo@gorilla.com';
            user.password = 'password123';

            jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

            expect(await service.findOne(1)).toBe(user);
        });
    });

    describe('update', () => {
        it('should update a user', async () => {
            const user = new User();
            user.id = 1;
            user.name = 'Crentuê';
            user.email = 'roxo@gorilla.com';
            user.password = 'password123';

            jest.spyOn(repository, 'update').mockResolvedValue(undefined);
            jest.spyOn(repository, 'findOneBy').mockResolvedValue(user);

            expect(await service.update(1, { name: 'Crentuê' })).toBe(user);
        });
    });

    describe('remove', () => {
        it('should remove a user', async () => {
            jest.spyOn(repository, 'delete').mockResolvedValue(undefined);

            await expect(service.remove(1)).resolves.not.toThrow();
        });
    });
});
