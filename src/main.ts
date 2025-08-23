import { bootstrapApplication } from '@angular/platform-browser';
import { tableConfig } from './table/table.config';
import { Table } from './table/table';

bootstrapApplication(Table, tableConfig)
  .catch((err) => console.error(err));
