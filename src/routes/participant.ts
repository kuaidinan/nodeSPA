'use strict';

var express = require('express')
const router = express.Router();

import Participant from '../controller/participant/index';
const participant = new Participant();

router.get('/getList', participant.getList);

export default router;