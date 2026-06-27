import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-950 dark:to-gray-900 text-gray-900 dark:text-gray-100 flex flex-col justify-between">
      <Header />
      
      <main className="max-w-6xl w-full mx-auto px-4 sm:px-6 py-12 md:py-20 flex-1 flex flex-col justify-center space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400 border border-blue-150 dark:border-blue-900/30 text-xs font-bold uppercase tracking-wider">
            🌿 Reduction of Surplus Food Waste
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-gray-900 dark:text-white leading-none">
            Bridging the Gap Between <br className="hidden sm:inline" />
            <span className="text-blue-600 dark:text-blue-400">Surplus Food</span> and <span className="text-emerald-600 dark:text-emerald-400">Shelters</span>
          </h1>
          
          <p className="text-base sm:text-lg text-gray-550 dark:text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Every day, tons of delicious, perfectly safe surplus food goes to waste at restaurants. 
            FoodBridge provides a real-time coordination center for NGOs and shelters to claim and distribute it.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <a
              href="/donations/new"
              className="w-full sm:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition duration-200 text-center select-none"
            >
              I'm a Restaurant
            </a>
            <a
              href="/donations"
              className="w-full sm:w-auto px-6 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-350 hover:bg-gray-50 dark:hover:bg-gray-750 rounded-xl text-sm font-bold shadow-2xs hover:shadow-sm transition duration-200 text-center select-none"
            >
              I'm an NGO / Shelter
            </a>
          </div>
        </section>

        {/* Feature Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <Card hoverEffect className="p-6 md:p-8 space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/20 text-blue-600 dark:text-blue-400 rounded-xl w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">Create Donations</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Restaurants can instantly list surplus meals with accurate packaging, quantities, and expiration timings.
            </p>
          </Card>

          <Card hoverEffect className="p-6 md:p-8 space-y-4">
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 rounded-xl w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">Claim Instantly</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Shelters browse available food in their vicinity and claim postings with a single, secure confirmable step.
            </p>
          </Card>

          <Card hoverEffect className="p-6 md:p-8 space-y-4">
            <div className="p-3 bg-purple-50 dark:bg-purple-950/20 text-purple-600 dark:text-purple-400 rounded-xl w-fit">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 17.75 3.75H6.25A2.25 2.25 0 0 0 4 6v12A2.25 2.25 0 0 0 6 20.25Z" />
              </svg>
            </div>
            <h3 className="font-extrabold text-lg text-gray-900 dark:text-white">Track Progress</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Follow every donation through its status cycle, from Available → Claimed → Picked Up → Completed.
            </p>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
}
