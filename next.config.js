/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  api: {
    bodyParser: false,
    externalResolver: true,
  },
  rewrites: async () => {
    return [
      {
        source: '/v3.0/pdf/users/:user_id/receipts/:zeipt_receipt_transnr',
        destination: '/api/v3.0/pdf/users/:user_id/receipts/:zeipt_receipt_transnr',
      },
    ];
  },
}

module.exports = nextConfig
