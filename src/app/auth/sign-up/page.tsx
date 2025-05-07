export default function SignUp() {
  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen p-4">
      <div className="bg-white rounded-lg shadow-sm border border-gray-100 max-w-md w-full p-8">
        <h1 className="text-2xl font-bold text-center mb-2">Buat Akun Baru</h1>
        <p className="text-gray-400 text-center mb-6">
          Masukkan informasi Anda untuk membuat akun Audicia
        </p>

        {/* Social Sign-up Options (if any, can be added here) */}

        {/* Form Fields */}
        <form className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="first-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama depan
              </label>
              <input
                type="text"
                id="first-name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
            <div>
              <label
                htmlFor="last-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Nama belakang
              </label>
              <input
                type="text"
                id="last-name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Kata sandi
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
            <p className="text-xs text-gray-400 mt-1">
              Kata sandi harus setidaknya memiliki panjang 8 karakter dan
              terdiri dari angka serta karakter spesial.
            </p>
          </div>

          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Konfirmasi kata sandi
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 h-4 w-4 text-gray-900 focus:ring-gray-400 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              Saya setuju dengan{" "}
              <a href="#" className="text-gray-900 font-medium">
                Persyaratan Layanan
              </a>{" "}
              dan{" "}
              <a href="#" className="text-gray-900 font-medium">
                Kebijakan Privasi
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-primary-orange text-white py-2 px-4 rounded-md hover:bg-secondary-orange focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2"
          >
            Buat akun
          </button>
        </form>

        <p className="text-center mt-6 text-sm text-gray-600">
          Sudah memiliki akun?{" "}
          <a
            href="auth/sign-in.html"
            className="font-medium text-gray-900 hover:underline"
          >
            Masuk
          </a>
        </p>
      </div>
    </div>
  );
}
