export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-purple-100 to-white">
      <main>
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl font-bold text-darkblue-900">TeresAI</h1>
          <p className="text-grey-200">Medical Transcription System</p>
        </div>

        <div className="mt-8 p-6 border rounded-lg shadow-lg bg-purple-500">
          <h2 className="text-2xl font-bold mb-6 text-darkblue-900">Patient Summary</h2>
          
          <div className="grid gap-6">
            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Eating Behaviour</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Medicine Administration</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Sleep</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Energy</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Pain Complaints</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Stool</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-purple-50 transition-colors">
              <h3 className="text-lg font-semibold text-darkblue-800">Blood Pressure</h3>
              <div className="mt-2 text-white">No data recorded yet</div>
            </div>

            <div className="p-4 border rounded hover:bg-gray-200 bg-blue-50">
              <h3 className="text-lg font-semibold text-blue-800">Care Goals</h3>
              <div className="mt-2 text-grey-100">No goals set yet</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}