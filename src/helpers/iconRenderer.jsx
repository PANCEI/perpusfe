import React from 'react';
import * as LucideIcons from 'lucide-react';

/**
 * Memetakan string nama ikon dari database menjadi komponen Lucide React asli
 * @param {string} iconName - Nama ikon (contoh: 'LayoutDashboard', 'Users')
 * @returns {JSX.Element}
 */
export const renderDynamicIcon = (iconName) => {
  if (!iconName) return <LucideIcons.FileText size={20} />;
  
  const FormattedIcon = LucideIcons[iconName];
  return FormattedIcon ? <FormattedIcon size={20} /> : <LucideIcons.FileText size={20} />;
};