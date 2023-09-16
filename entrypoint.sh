#!/bin/sh
npm run build
npm run start &
npm run typeorm:run
npm run seed:run
