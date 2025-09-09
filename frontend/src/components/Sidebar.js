import React from 'react';
import { Plus } from 'lucide-react';

const Sidebar = ({ onNewChat }) => {
    return (
        <div className="w-[300px] h-full bg-muted/50 border-r flex flex-col">
            <div className="p-4">
                <button 
                    onClick={onNewChat}
                    className="w-full flex items-center justify-center gap-2 rounded-lg border bg-background px-4 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    <span>New chat</span>
                </button>
            </div>
            <div className="flex-1 overflow-auto p-4">
                {/* Chat history will be added here later */}
            </div>
            <div className="border-t p-4">
                <div className="flex items-center gap-2 px-2">
                    <span className="text-sm font-medium">Wall-e</span>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;
