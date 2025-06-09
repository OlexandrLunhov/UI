const AboutPage = () => (
  <div className="bg-gray-900 min-h-screen py-10">
    <div className="p-6 bg-gray-600 rounded-lg shadow-xl max-w-4xl mx-auto mt-8 sm:px-8">
      <h1 className="text-3xl font-extrabold text-blue-400 mb-4">
        Про TgChat
      </h1>
      <p className="text-lg text-gray-300">
        Це сучасний веб-додаток для обміну повідомленнями, що забезпечує зручне та ефективне спілкування між користувачами. TgChat надає можливість швидко взаємодіяти з друзями, колегами або учасниками спільнот у простому та інтуїтивно зрозумілому інтерфейсі.
      </p>
      <div className="mt-6 p-4 bg-gray-900 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-blue-400">Ключові функції:</h2>
        <ul className="list-disc pl-6 text-gray-300">
          <li>Зручний і зрозумілий інтерфейс для обміну повідомленнями</li>
          <li>Реєстрація та авторизація користувачів</li>
          <li>Підтримка групових чатів для колективного спілкування</li>
          <li>Миттєва доставка повідомлень у реальному часі</li>
        </ul>
      </div>
      <div className="mt-6 text-gray-300">
        <p>
          TgChat побудований з використанням сучасних технологій: ReactJS для фронтенду та NodeJS для бекенду. Такий технічний стек забезпечує високу продуктивність, надійність і швидкодію додатка.
        </p>
      </div>
    </div>
  </div>
);

export default AboutPage;