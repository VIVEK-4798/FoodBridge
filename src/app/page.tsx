import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main className="max-w-6xl mx-auto p-6">
        <section className="py-12 text-center">
          <h1 className="text-4xl font-extrabold mb-4">FoodBridge</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">Reduce food waste by connecting restaurants with NGOs. Create donations, claim pickups, and track status — fast and simple.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="/donations/new" className="px-5 py-3 bg-blue-600 text-white rounded">I'm a Restaurant</a>
            <a href="/donations" className="px-5 py-3 border border-gray-300 rounded">I'm an NGO</a>
          </div>
        </section>

        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Create Donation</h3>
            <p className="text-sm text-gray-500 mt-2">Restaurants can post surplus meals with pickup details.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Browse & Claim</h3>
            <p className="text-sm text-gray-500 mt-2">NGOs can view available donations and claim them instantly.</p>
          </div>
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Track Status</h3>
            <p className="text-sm text-gray-500 mt-2">Follow each donation from Available → Claimed → Picked Up → Completed.</p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
