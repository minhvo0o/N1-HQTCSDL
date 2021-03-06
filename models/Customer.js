const { Request, TYPES } = require('tedious')
const { databaseUtil } = require('../utils')
const { connection } = databaseUtil
const _ = require('lodash')

const getOrders = () => {
  return new Promise((resolve, reject) => {
    // Read all rows from table
    const request = new Request(
      `SELECT * FROM DonHang
      INNER JOIN KhachHang ON DonHang.MaKH = KhachHang.MaKH
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

const createCustomer = (body) => {
  return new Promise((resolve, reject) => {
    const sql = `
      INSERT KhachHang (
        HoTenKH,
        DienThoaiKH,
        DiaChiKH,
        EmailKH
      )
      VALUES(
        @HoTenKH,
        @DienThoaiKH,
        @DiaChiKH,
        @EmailKH
      );
    `

    const request = new Request(sql, function (err) {
      if (err) {
        reject(err)
      }
    })

    request.addParameter('MaKH', TYPES.Char, body.MaKH)
    request.addParameter('HoTenKH', TYPES.NVarChar, body.HoTenKH)
    request.addParameter('DienThoaiKH', TYPES.Char, body.DienThoaiKH)
    request.addParameter('EmailKH', TYPES.Char, body.EmailKH)

    const rows = []

    request.on('row', columns => {
      const obj = {}

      columns.forEach(column => {
        obj[column.metadata.colName] = column.value
      })

      rows.push(obj)
    })

    request.on('requestCompleted', function () {
      resolve(Array.isArray(rows) && rows.length > 0 ? rows[0] : null)
    })

    connection.execSql(request)
  })
}

const getOrders2 = () => {
  return new Promise((resolve, reject) => {
    const request = new Request(
      'SELECT * FROM DonHang, KhachHang WHERE DonHang.MaKH = KhachHang.MaKH',
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

const getOrder = (MaDH) => {
  return new Promise((resolve, reject) => {
    const request = new Request(
      'SELECT * FROM DonHang, KhachHang WHERE DonHang.MaDH = @MaDH AND DonHang.MaKH = KhachHang.MaKH',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    request.addParameter('MaDH', TYPES.Char, MaDH)

    const data = []

    request.on('row', columns => {
      const obj = {}

      for (const column of columns) {
        obj[column.metadata.colName] = column.value
      }

      data.push(obj)
    })

    request.on('requestCompleted', () => {
      resolve(_.first(data))
    })

    connection.execSql(request)
  })
}

const getOrderDetails = (MaDH) => {
  return new Promise((resolve, reject) => {
    const request = new Request(
      'SELECT * FROM ChiTietDonHang, SanPham WHERE ChiTietDonHang.MaDH = @MaDH AND ChiTietDonHang.MaSP = SanPham.MaSP',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    request.addParameter('MaDH', TYPES.Char, MaDH)

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

const getOrderTransports = (MaDH) => {
  return new Promise((resolve, reject) => {
    const request = new Request(
      'SELECT * FROM VANCHUYEN, ThongTinVanChuyen WHERE VANCHUYEN.MaDH = @MaDH AND VANCHUYEN.MaVC = ThongTinVanChuyen.MaVC',
      (err, rowCount, rows) => {
        if (err) {
          reject(err)
        }
      }
    )

    request.addParameter('MaDH', TYPES.Char, MaDH)

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
  createCustomer,
  getCustomers,
  getOrders2,
  getOrder,
  getOrderDetails,
  getOrderTransports
}
