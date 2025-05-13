import * as migration_20250509_190553_init from './20250509_190553_init';

export const migrations = [
  {
    up: migration_20250509_190553_init.up,
    down: migration_20250509_190553_init.down,
    name: '20250509_190553_init'
  },
];
