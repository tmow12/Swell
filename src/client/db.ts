import Dexie from 'dexie';
import { initialState } from '../types'

const db = new Dexie('Swell');

db.on('versionchange', (event) => {
  if (
    confirm(
      `Another page tries to upgrade the database to version ${event.newVersion}. Accept?`
    )
  ) {
    // Refresh current webapp so that it starts working with newer DB schema.
    return window.location.reload();
  }
  // Will let user finish its work in this window and
  // block the other window from upgrading.
  return false;
});

db.version(2).stores({ //---> original setup
  history: 'id, created_at',
  collections: 'id, created_at, &name',
});

db.version(1).stores({ //---> original setup
  history: 'id, created_at',
});
// db.table('history').put({})

// db.open()

export default db;
