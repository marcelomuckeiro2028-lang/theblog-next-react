type AdminPostLayoutProps = {
  children: React.ReactNode;
};

// ✅ Apenas use React.ReactNode
export default function AdminPostLayout({ children }: Readonly<AdminPostLayoutProps>) {
  return <>{children}</>;
}

// 468769 senha do fire fox
