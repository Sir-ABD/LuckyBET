// resources/js/components/ui/Card.tsx
import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
interface CardProps {
children: ReactNode;
className?: string;
}
const Card: React.FC<CardProps> = ({ children, className = '' }) => {
return (
<motion.div
initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
transition={{ duration: 0.5 }}
className={bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg p-6 ${className}}
>
{children}
</motion.div>
);
};
export default Card;