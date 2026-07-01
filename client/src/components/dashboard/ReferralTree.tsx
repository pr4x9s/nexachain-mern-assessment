import React, { useState } from 'react'
import { useReferralTree } from '../../hooks/useDashboardData.ts'
import { formatCurrency } from '../../utils/format.ts'
import { format } from 'date-fns'
import { ChevronRight, ChevronDown, User, Network } from 'lucide-react'
import type { ReferralNode } from '../../types/types.ts'


interface TreeNodeItemProps {
    node: ReferralNode;
    level: number;
}

// Isolated recursive item renderer component
const TreeNodeItem: React.FC<TreeNodeItemProps> = ({ node, level }) => {

    const [isOpen, setIsOpen] = useState(false);
    const hasChildren = node.children && node.children.length > 0;

    return (
        <div className='ml-4 border-l border-zinc-100 dark:border-zinc-800/60 pl-3 my-1'>
            <div 
                onClick={() => hasChildren && setIsOpen(!isOpen)}
                className={`flex items-center justify-between p-3 rounded-xl transition-all duration-150 group ${
                    hasChildren ? 'cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900/40' : ''
                }`}
            >
                <div className='flex items-center gap-2.5'>
                    <div className='flex items-center justify-center w-5 h-5'>
                        {hasChildren ? (
                            isOpen ? <ChevronDown className='h-4 w-4 text-zinc-400' /> : <ChevronRight className='h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 transition-transform' />
                        ) : (
                            <User className='h-3.5 w-3.5 text-zinc-300 dark:text-zinc-600' />
                        )}
                    </div>
                    <div>
                        <p className='text-sm font-semibold text-zinc-800 dark:text-zinc-200'>
                            {node.fullName}
                        </p>
                        <p className='text-xs text-zinc-400 font-mono'>{node.email}</p>
                    </div>
                </div>

                <div className='text-right'>
                    <p className='text-sm font-bold text-zinc-900 dark:text-zinc-100 font-mono'>
                        {formatCurrency(node.walletBalance)}
                    </p>
                    <p className='text-[10px] text-zinc-400 font-mono'>
                        Joined {format(new Date(node.createdAt), 'dd MMM yyyy')}
                    </p>
                </div>
            </div>

            {/* Recursive self-mounting call loop */}
            {hasChildren && isOpen && (
                <div className='mt-1 transition-all duration-200'>
                    {node.children.map((childNode) => (
                        <TreeNodeItem key={childNode._id} node={childNode} level={level + 1} />
                    ))}
                </div>
            )}
        </div>
    );
};

const ReferralTree: React.FC = () => {
    const { data: treeData, isLoading, isError } = useReferralTree();

    if (isLoading) {
        return (
            <div className='p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-sm animate-pulse h-80'>
                <div className='h-5 w-40 bg-zinc-200 dark:bg-zinc-800 rounded mb-4' />
                <div className='space-y-3'>
                    <div className='h-12 w-full bg-zinc-100 dark:bg-zinc-800/40 rounded-xl' />
                    <div className='h-12 w-[90%] ml-auto bg-zinc-100 dark:bg-zinc-800/20 rounded-xl' />
                </div>
            </div>
        );
    }

    if (isError) return null;

    return (
        <div className='p-6 rounded-2xl border border-zinc-100 dark:border-zinc-800/80 bg-white dark:bg-zinc-900/40 backdrop-blur-sm shadow-sm max-h-105 overflow-y-auto'>
            <div className='flex items-center gap-2 mb-4'>
                <Network className='h-4 w-4 text-indigo-500' />
                <h3 className='text-base font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight'>
                    Multi-Level Referral Tree
                </h3>
            </div>

            {treeData?.data && treeData.data.length > 0 ? (
                <div className='-ml-4'>
                    {treeData.data.map((rootNode) => (
                        <TreeNodeItem key={rootNode._id} node={rootNode} level={1} />
                    ))}
                </div>
            ) : (
                <div className='text-center py-12 text-zinc-400 text-sm'>
                    No downline network links registered to this node.
                </div>
            )}
        </div>
    )
}

export default ReferralTree