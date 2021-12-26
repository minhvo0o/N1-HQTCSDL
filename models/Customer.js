const { Request, TYPES } = require('tedious')
const { databaseUtil } = require('../utils')
const { connection } = databaseUtil

const getOrders = () => {
  return new Promise((resolve, reject) => {
    // Read all rows from table
    const request = new Request(
      `SELECT DonHang.MaDH, ChiTietDonHang.MaSP, SanPham.TenSP, ThongTinVanChuyen.TinhTrangVC
      FROM DonHang
      INNER JOIN ChiTietDonHang ON DonHang.MaDH = ChiTietDonHang.MaDH
      INNER JOIN SanPham ON ChiTietDonHang.MaSP = SanPham.MaSP
      INNER JOIN VanChuyen ON DonHang.MaDH = VanChuyen.MaDH
      FULL OUTER JOIN ThongTinVanChuyen ON VanChuyen.MaVC = ThongTinVanChuyen.MaVC`
      ,
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    const data = []

    request.on('row', columns => {
      const obj = {}

      for (const column of columns) {
        obj[column.metadata.colName] = column.value
      }

      data.push(obj)
    })

    request.on('requestCompleted', () => {
      resolve(data)
    })

    connection.execSql(request)
  })
}

const createOrder = (body) => {
  return new Promise((resolve, reject) => {
    const request = new Request('[dbo].[SP_ThemDonHang]', (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })

    request.addParameter('MaKH', TYPES.Char, body.MaKH)
    request.addParameter('HTTT', TYPES.Bit, parseInt(body.HinhThucTT))
    request.addParameter('DiaChi', TYPES.NVarChar, body.DiaChiGiaoHang)
    request.addParameter('NGAY', TYPES.Date, body.NgayDatHang)

    connection.callProcedure(request)
  })
}

const createOrderDetails = (body) => {
  return new Promise((resolve, reject) => {
    const request = new Request('[dbo].[SP_ThemCTDH]', (err) => {
      if (err) {
        reject(err)
        return
      }

      resolve()
    })

    request.addParameter('MADH', TYPES.Char, body.MaDH)
    request.addParameter('MASP', TYPES.Char, body.MaSP)
    request.addParameter('SOLUONG', TYPES.Int, parseInt(body.SoLuong))

    connection.callProcedure(request)
  })
}

const getCustomers = () => {
  return new Promise((resolve, reject) => {
    const request = new Request(
      'SELECT * FROM KhachHang',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    const data = []

    request.on('row', columns => {
      const obj = {}

      for (const column of columns) {
        obj[column.metadata.colName] = column.value
      }

      data.push(obj)
    })

    request.on('requestCompleted', () => {
      resolve(data)
    })

    connection.execSql(request)
  })
}

module.exports = {
  getOrders,
  createOrder,
  createOrderDetails,

  getCustomers
}
