import * as migration_20250509_190553_init from './20250509_190553_init';
import * as migration_20250521_194452_update from './20250521_194452_update';

export const migrations = [
  {
    up: migration_20250509_190553_init.up,
    down: migration_20250509_190553_init.down,
    name: '20250509_190553_init',
  },
  {
    up: migration_20250521_194452_update.up,
    down: migration_20250521_194452_update.down,
    name: '20250521_194452_update'
  },
];
