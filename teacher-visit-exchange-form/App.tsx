import React, { useRef } from 'react';
import { Header } from './components/Header';
import { InfoSection } from './components/InfoSection';
import { EvaluationTable } from './components/EvaluationTable';
import { Footer } from './components/Footer';
import { Printer } from 'lucide-react';

const App: React.FC = () => {
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen py-8 px-2 sm:px-4 md:px-8 flex justify-center">
      {/* Floating Action Button for Print */}
      <button 
        onClick={handlePrint}
        className="fixed bottom-8 left-8 bg-teal-600 text-white p-4 rounded-full shadow-lg hover:bg-teal-700 transition-all z-50 no-print flex items-center gap-2"
        aria-label="Print Form"
      >
        <Printer size={24} />
        <span className="hidden md:inline font-bold">طباعة النموذج</span>
      </button>

      {/* A4 Paper Container */}
      <div 
        ref={printRef}
        className="w-full max-w-[210mm] bg-white shadow-2xl rounded-xl print:shadow-none print:w-full print:max-w-none print:rounded-none overflow-hidden"
        style={{ minHeight: '297mm' }}
      >
        <div className="flex flex-col h-full relative">
          <Header />
          <InfoSection />
          <EvaluationTable />
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default App;