import React from 'react';
import type { GroupedStudentData, IStudentResult } from './types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Plus, Printer, PrinterIcon } from 'lucide-react';
import ResultsTable from './table-config/results-table';

interface StudentProfileProps {
    data: GroupedStudentData;
    onBack: () => void;
    onEditResult: (result: IStudentResult) => void;
    onDeleteResult: (resultId: string) => void;
    onAddResult: () => void;
}

const StudentResultProfile: React.FC<StudentProfileProps> = ({ 
    data, 
    onBack, 
    onEditResult, 
    onDeleteResult,
    onAddResult
}) => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-300">
            {/* Header / Breadcrumb */}
            <div className="flex items-center gap-4 no-print">
                <Button variant="ghost" size="sm" onClick={onBack} className="-ml-2 text-slate-500 hover:text-slate-900">
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Students
                </Button>
                <div className="h-4 w-px bg-slate-300"></div>
                <span className="text-sm font-medium text-slate-900">Student Profile</span>
            </div>

            {/* Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="h-32 bg-gradient-to-r from-primary-800 to-primary-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                         <div className="flex items-end gap-6">
                            <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-md">
                                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${data.student.matricNo}`} alt="" className="h-full w-full object-cover" />
                            </div>
                            <div className="pb-1">
                                <h1 className="text-2xl font-bold text-slate-900">{data.student.name}</h1>
                                <div className="text-slate-500 flex items-center gap-2 text-sm">
                                    <span>{data.student.matricNo}</span>
                                    <span>•</span>
                                    <span>B.Sc. Cybersecurity</span>
                                </div>
                            </div>
                         </div>
                         <div className="flex gap-2 mb-1 no-print">
                              <Button variant="outline" onClick={handlePrint}>
                                  <PrinterIcon className="w-4 h-4 mr-2" />
                                  Print Transcript
                              </Button>
                              <Button onClick={onAddResult}>
                                  <Plus className="w-4 h-4 mr-2" />
                                  Add Result
                              </Button>
                         </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 border-t border-slate-100 pt-6">
                        <div>
                             <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Email Address</label>
                             <div className="text-sm font-medium text-slate-900">{data.student.name.split(' ')[0].toLowerCase()}@student.lasu.ng</div>
                        </div>
                        <div>
                             <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Phone</label>
                             <div className="text-sm font-medium text-slate-900">+234 812 345 6789</div>
                        </div>
                        <div>
                             <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Current Level</label>
                             <div className="text-sm font-medium text-slate-900">100 Level</div>
                        </div>
                         <div>
                             <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">CGPA</label>
                             <div className="text-sm font-bold text-primary-700">4.52</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Results Section */}
            <div>
                 <h2 className="text-lg font-bold text-slate-900 mb-4">Academic Results</h2>
                 <ResultsTable
                    results={data.results}
                    onEditResult={onEditResult}
                    onDeleteResult={onDeleteResult}
                 />
            </div>
        </div>
    );
};

export default StudentResultProfile;