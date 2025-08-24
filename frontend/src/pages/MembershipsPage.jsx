import { useEffect } from "react"
import MembershipsTable from "../components/MembershipsTable"
import { useMembership } from "../context/MembershipContext"

function MembershipPage() {
  const { membership, getMemberships } = useMembership()

  useEffect(() => {
    getMemberships()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-emerald-900/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-2">Membresías</h1>
            <p className="text-emerald-400 text-lg">Gestiona las membresías de tu gimnasio</p>
          </div>
          <div className="bg-emerald-500/10 backdrop-blur-sm border border-emerald-500/20 rounded-lg px-4 py-2">
            <span className="text-emerald-400 font-semibold">Total: {membership.length} membresías</span>
          </div>
        </div>

        <div className="grid gap-6">
          {membership.length === 0 ? (
            <div className="bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 p-8 rounded-xl text-center">
              <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">No hay membresías aún</h3>
              <p className="text-gray-400 mb-4">Comienza creando la primera membresía de tu gimnasio</p>
            </div>
          ) : (
            <MembershipsTable />
          )}
        </div>
      </div>
    </div>
  )
}

export default MembershipPage
