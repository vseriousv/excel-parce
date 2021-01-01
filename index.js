'use strict';
const excelToJson = require('convert-excel-to-json');
const fs = require('fs');
const random = require('randomstring');
const axios = require('axios');

const {users_new} = excelToJson({
    sourceFile: './User_list_new.xlsx',
    sheets:[{
        name: 'users_new',
        columnToKey: {
            A: 'tabNumber',
            B: 'emailAddress',
            C: 'lastnameRU',
            D: 'firstnameRu',
            E: 'patronymicRu',
            F: 'positionName',
            G: 'sectionName',
            H: 'cityName',
            I: 'stateId',
            J: 'lastnameEn',
            K: 'firstnameEn',
            L: 'positionNameEng',
            M: 'sectionNameEng',
            N: 'cityNameEng',
        }
    }]
});
const dataUsers = users_new.slice(1)
console.log(dataUsers.length)
dataUsers.forEach( async (item) => {
    const pass = random.generate({
        length: 6,
        charset: 'hex'
    });
   const sendObj = {
       email: item.emailAddress,
       password: pass,
       tabNumber: item.tabNumber,
       firstnameRu: item.firstnameRu,
       firstnameEn: item.firstnameEn,
       lastnameRu: item.lastnameRU,
       lastnameEn: item.lastnameEn,
       patronymicRu: item.patronymicRu,
       patronymicEn: '',
       stateId: item.stateId,
       positionName: item.positionName,
       cityName:  item.cityName,
       sectionName:  item.sectionName,
       positionNameEng:  item.positionNameEng,
       cityNameEng:  item.cityNameEng,
       sectionNameEng:  item.sectionNameEng,
       passwordText: pass
   }
   console.log(sendObj);
   try {
       const {data} = await axios.post('https://api.vtaward.ru/users/register', sendObj);
       console.loe('[OK]', data)
   } catch (e) {
       console.error('[ER]',e)
   }
});