
const Sequelize = require("sequelize");
const sequelize = new Sequelize("calendar", "root", "h7%kVyfPqP9p!LyJ!8*%", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false,
    tableName: "calendar"
  }
});
//-2 reserved
//-1 free

async function GetAllReservedMastersForDateAndTime(date_time)
{
  let mastersId = [];
  let res = await sequelize.query("SELECT * FROM `calendar` WHERE `date_time` = :dt", 
  { replacements: { dt: date_time }, type: sequelize.QueryTypes.SELECT }
  )
  for (var i in res[0])
  {
      if (res[0][i] == -2)
      {
        mastersId.push(i);
      }
  }
  return mastersId
}
  
async function ReserveTimeAndDateToMaster(date_time, masterId, userId)
{
  const res = await sequelize.query(`SELECT * FROM \`calendar\` WHERE \`date_time\` = ${date_time};`) 

    if(!res[0][0]) //check the date_time inside the calendar
    {
      await sequelize.query(`INSERT INTO \`calendar\`.\`calendar\` (\`date_time\`, \`${masterId}\`, `
      + `\`${masterId}_reserved_for_user\`) VALUES ('${date_time}', '-2', '${userId}');`)
    }
    else
    {
      let sqlCommand = `UPDATE \`calendar\`.\`calendar\`` 
      + ` SET \`${masterId}\` = '-2',`
      + ` \`${masterId}_reserved_for_user` + `\` = '${userId}' WHERE (\`date_time\` = '${date_time}');`;

      await sequelize.query(sqlCommand)
    }
}


async function AddMasterToCalendar(masterId) {
  
  let sqlCommand = `ALTER TABLE \`calendar\`.\`calendar\`` 
    + `ADD COLUMN \`${masterId}\` TINYINT NOT NULL DEFAULT '-1',`
    + `ADD COLUMN \`` + `${masterId}_reserved_for_user` + `\` INT(11) NOT NULL DEFAULT '0';`;

  await sequelize.query(sqlCommand)
}

async function DeleteMasterFromCalendar(masterId) {
  
  let sqlCommand = `ALTER TABLE \`calendar\`.\`calendar\`` 
    + `DROP COLUMN \`${masterId}\`,`
    + `DROP COLUMN \`` + `${masterId}_reserved_for_user\``;

   await sequelize.query(sqlCommand)
}

module.exports.GetAllReservedMastersForDateAndTime = GetAllReservedMastersForDateAndTime;
module.exports.ReserveTimeAndDateToMaster = ReserveTimeAndDateToMaster;
module.exports.AddMasterToCalendar = AddMasterToCalendar;
module.exports.DeleteMasterFromCalendar = DeleteMasterFromCalendar;
