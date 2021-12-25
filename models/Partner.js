const { Request, TYPES } = require('tedious')
const { databaseUtil } = require('../utils')

const { connection } = databaseUtil

const createPartner = function queryDatabase (body) {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT DoiTac (
        MSTDoiTac,
        TenDoiTac,
        NguoiDaiDien,
        ThanhPho,
        Quan,
        SoChiNhanh,
        DonMoiNgay,
        LoaiHang,
        DiaChiKinhDoanh,
        DienThoaiDT,
        Email
      )
      OUTPUT
        INSERTED.MSTDoiTac,
        INSERTED.TenDoiTac,
        INSERTED.NguoiDaiDien,
        INSERTED.ThanhPho,
        INSERTED.Quan,
        INSERTED.SoChiNhanh,
        INSERTED.DonMoiNgay,
        INSERTED.LoaiHang,
        INSERTED.DiaChiKinhDoanh,
        INSERTED.DienThoaiDT,
        INSERTED.Email
      VALUES(
        @MSTDoiTac,
        @TenDoiTac,
        @NguoiDaiDien,
        @ThanhPho,
        @Quan,
        @SoChiNhanh,
        @DonMoiNgay,
        @LoaiHang,
        @DiaChiKinhDoanh,
        @DienThoaiDT,
        @Email
      );
    `

    const request = new Request(sql, function (err) {
      if (err) {
        reject(err)
        console.log(err)
      }
    })

    request.addParameter('MSTDoiTac', TYPES.Int, body.MSTDoiTac)
    request.addParameter('TenDoiTac', TYPES.NVarChar, body.TenDoiTac)
    request.addParameter('NguoiDaiDien', TYPES.NVarChar, body.NguoiDaiDien)
    request.addParameter('ThanhPho', TYPES.NVarChar, body.ThanhPho)
    request.addParameter('Quan', TYPES.NVarChar, body.Quan)
    request.addParameter('SoChiNhanh', TYPES.Int, body.SoChiNhanh)
    request.addParameter('DonMoiNgay', TYPES.Int, body.DonMoiNgay)
    request.addParameter('LoaiHang', TYPES.NVarChar, body.LoaiHang)
    request.addParameter('DiaChiKinhDoanh', TYPES.NVarChar, body.DiaChiKinhDoanh)
    request.addParameter('DienThoaiDT', TYPES.VarChar, body.DienThoaiDT)
    request.addParameter('Email', TYPES.VarChar, body.Email)

    const data = []

    request.on('row', columns => {
      const obj = {}

      columns.forEach(column => {
        obj[column.metadata.colName] = column.value
      })

      data.push(obj)
    })

    request.on('requestCompleted', function () {
      resolve(data)
    })

    connection.execSql(request)
  })
}

module.exports = {
  createPartner
}
