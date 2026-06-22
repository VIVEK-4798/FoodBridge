import React from 'react';

export default function ProfilePage() {
  // Placeholder: user info from NextAuth session
  return (
    <main className="p-6 max-w-lg">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="p-4 border rounded space-y-2">
        <div><strong>Name:</strong> —</div>
        <div><strong>Email:</strong> —</div>
        <div><strong>Role:</strong> —</div>
      </div>
    </main>
  );
}
