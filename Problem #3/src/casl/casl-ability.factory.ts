import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { Officer } from 'src/officers/officers';
import { Action, Role } from 'src/role/role.enum';

type Subjects = InferSubjects<typeof Officer> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  createForUser(user: Officer) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    if (user.role === Role.HR) {
      can(Action.MANAGE, 'all');
    }
    cannot(Action.UPDATE, Officer, ['password']);
    can(Action.UPDATE, Officer, ['password'], { uid: user.uid });
    return build({
      detectSubjectType: (item) =>
        item.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
