const { Request, TYPES } = require('tedious')
const { databaseUtil } = require('../utils')
const _ = require('lodash')

const { connection } = databaseUtil

const getPartners = function queryDatabase () {
  return new Promise((resolve, reject) => {
    const request = new Request(
      'SELECT * FROM DoiTac',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

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

const createPartner = (body) => {
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

    const rows = []

    request.on('row', columns => {
      const obj = {}

      columns.forEach(column => {
        obj[column.metadata.colName] = column.value
      })

      rows.push(obj)
    })

    request.on('requestCompleted', function () {
      resolve(_.first(rows))
    })

    connection.execSql(request)
  })
}

const createContract = (body) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT HopDong (
        MaHopDong,
        MSTDoiTac,
        MSTNhanVien,
        ThoiHan,
        PhanTramHoaHong,
        TinhTrangHD
      )
      OUTPUT
        INSERTED.MaHopDong,
        INSERTED.MSTDoiTac,
        INSERTED.MSTNhanVien,
        INSERTED.ThoiHan,
        INSERTED.PhanTramHoaHong,
        INSERTED.TinhTrangHD
      VALUES(
        @MaHopDong,
        @MSTDoiTac,
        @MSTNhanVien,
        @ThoiHan,
        @PhanTramHoaHong,
        @TinhTrangHD
      );
    `

    const request = new Request(sql, (err) => {
      if (err) {
        reject(err)
      }
    })

    request.addParameter('MaHopDong', TYPES.Char, body.MaHopDong)
    request.addParameter('MSTDoiTac', TYPES.Int, body.MSTDoiTac)
    request.addParameter('MSTNhanVien', TYPES.Int, body.MSTNhanVien)
    request.addParameter('ThoiHan', TYPES.Date, body.ThoiHan)
    request.addParameter('PhanTramHoaHong', TYPES.Int, body.PhanTramHoaHong)
    request.addParameter('TinhTrangHD', TYPES.Bit, parseInt(body.TinhTrangHD))

    const rows = []

    request.on('row', columns => {
      const obj = {}

      columns.forEach(column => {
        obj[column.metadata.colName] = column.value
      })

      rows.push(obj)
    })

    request.on('requestCompleted', function () {
      resolve(_.first(rows))
    })

    connection.execSql(request)
  })
}

module.exports = {
  getPartners,
  createPartner,
  createContract
}
