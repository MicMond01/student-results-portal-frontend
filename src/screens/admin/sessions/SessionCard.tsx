import type { ISession } from "./type";
import { Calendar, ChevronRight, Clock, Edit, Trash } from "lucide-react";
import { formatDate } from "@/lib/admin-results-helper";
import { Button } from "@/components/ui/button";

interface SessionCardProps {
  session: ISession;
  onEdit: (session: ISession) => void;
  getSessionStatus: (session: ISession) => string;
  onDelete: (id: string) => void;
  getStatusStyle: (status: string) => string;
  getIconStyle: (status: string) => string;
}

const SessionCard: React.FC<SessionCardProps> = ({
  session,
  onEdit,
  getSessionStatus,
  onDelete,
  getStatusStyle,
  getIconStyle,
}) => {
  const status = getSessionStatus(session);

  return (
    <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`h-12 w-12 rounded-lg flex items-center justify-center ${getIconStyle(
            status
          )}`}
        >
          {status === "CURRENT" ? (
            <Calendar className="w-6 h-6" />
          ) : status === "UPCOMING" ? (
            <Calendar className="w-6 h-6" />
          ) : (
            <Clock className="w-6 h-6" />
          )}
        </div>
        <span
          className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide border ${getStatusStyle(
            status
          )}`}
        >
          {status === "CURRENT" && (
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 inline-block mr-1.5 mb-0.5"></span>
          )}
          {status}
        </span>
      </div>

      <div className="mb-6">
        <h3 className="text-2xl font-bold text-slate-900 mb-1">
          {session.session}
        </h3>
        <p className="text-sm text-slate-500 font-medium">Academic Year</p>
      </div>

      <div className="space-y-3 mb-8 flex-1">
        <div className="flex items-center justify-between text-sm group">
          <div className="flex items-center gap-2 text-slate-400">
            <ChevronRight className="w-3 h-3 text-slate-300" /> Start
          </div>
          <span className="font-semibold text-slate-800">
            {formatDate(session.startDate)}
          </span>
        </div>
        <div className="w-full border-t border-dashed border-slate-100"></div>
        <div className="flex items-center justify-between text-sm group">
          <div className="flex items-center gap-2 text-slate-400">
            <ChevronRight className="w-3 h-3 text-slate-300" /> End
          </div>
          <span className="font-semibold text-slate-800">
            {formatDate(session.endDate)}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3 mt-auto">
        <Button
          variant="outline"
          className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
          onClick={() => onEdit(session)}
        >
          <Edit className="w-3.5 h-3.5 mr-2" /> Edit
        </Button>
        <Button
          variant="destructive"
          size="icon"
          className="bg-red-50 text-red-500 border-red-100 hover:bg-red-100 hover:text-red-600 hover:border-red-200"
          onClick={() => onDelete(session._id)}
        >
          <Trash className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default SessionCard;
