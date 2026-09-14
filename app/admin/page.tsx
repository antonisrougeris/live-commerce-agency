import { adminDb } from "@/lib/firebase/admin";

export const dynamic = "force-dynamic";

type MerchantRow = {
  id: string;
  createdAt: string;
  companyName: string;
  contactName: string;
  businessEmail: string;
  country: string;
  productCategory: string;
  averageRetailPrice: string;
  website: string;
  status: string;
};

type HostRow = {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  countryCity: string;
  status: string;
};

function timestampToString(value: unknown) {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value &&
    typeof (value as { toDate?: unknown }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }

  return "";
}

export default async function AdminPage() {
  try {
    const [merchantSnapshot, hostSnapshot] = await Promise.all([
      adminDb
        .collection("merchantApplications")
        .orderBy("createdAt", "desc")
        .limit(100)
        .get(),

      adminDb
        .collection("hostApplications")
        .orderBy("createdAt", "desc")
        .limit(100)
        .get()
    ]);

    const merchants: MerchantRow[] = merchantSnapshot.docs.map((doc) => {
      const item = doc.data();

      return {
        id: doc.id,
        createdAt: timestampToString(item.createdAt),
        companyName: item.companyName ?? "",
        contactName: item.contactName ?? "",
        businessEmail: item.businessEmail ?? "",
        country: item.country ?? "",
        productCategory: item.productCategory ?? "",
        averageRetailPrice: item.averageRetailPrice ?? "",
        website: item.website ?? "",
        status: item.status ?? "new"
      };
    });

    const hosts: HostRow[] = hostSnapshot.docs.map((doc) => {
      const item = doc.data();

      return {
        id: doc.id,
        createdAt: timestampToString(item.createdAt),
        fullName: item.fullName ?? "",
        email: item.email ?? "",
        countryCity: item.countryCity ?? "",
        status: item.status ?? "new"
      };
    });

    return (
      <main className="adminShell">
        <div className="adminTop">
          <div>
            <span className="adminKicker">INTERNAL</span>
            <h1>Applications</h1>
          </div>

          <div className="adminStats">
            <div>
              <span>Merchant leads</span>
              <strong>{merchants.length}</strong>
            </div>

            <div>
              <span>Host leads</span>
              <strong>{hosts.length}</strong>
            </div>
          </div>
        </div>

        <section className="adminSection">
          <h2>Merchant applications</h2>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Company</th>
                  <th>Contact</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Website</th>
                </tr>
              </thead>

              <tbody>
                {merchants.length === 0 ? (
                  <tr>
                    <td colSpan={8}>No merchant applications yet.</td>
                  </tr>
                ) : (
                  merchants.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("en-GB")
                          : "—"}
                      </td>

                      <td>
                        <strong>{item.companyName}</strong>
                      </td>

                      <td>
                        {item.contactName}
                        <br />
                        <a href={`mailto:${item.businessEmail}`}>
                          {item.businessEmail}
                        </a>
                      </td>

                      <td>{item.country}</td>
                      <td>{item.productCategory}</td>
                      <td>{item.averageRetailPrice}</td>

                      <td>
                        <span className="statusBadge">{item.status}</span>
                      </td>

                      <td>
                        <a
                          href={item.website}
                          target="_blank"
                          rel="noreferrer"
                        >
                          Open ↗
                        </a>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        <section className="adminSection">
          <h2>Host applications</h2>

          <div className="tableWrap">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Location</th>
                  <th>Status</th>
                </tr>
              </thead>

              <tbody>
                {hosts.length === 0 ? (
                  <tr>
                    <td colSpan={5}>No host applications yet.</td>
                  </tr>
                ) : (
                  hosts.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString("en-GB")
                          : "—"}
                      </td>

                      <td>
                        <strong>{item.fullName}</strong>
                      </td>

                      <td>
                        <a href={`mailto:${item.email}`}>{item.email}</a>
                      </td>

                      <td>{item.countryCity}</td>

                      <td>
                        <span className="statusBadge">{item.status}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    console.error("Admin page error:", error);

    return (
      <main className="adminShell">
        <h1>LiveSell Admin</h1>

        <div className="adminError">
          Firestore query failed. Check your Firebase environment variables and
          make sure Firestore has been created for the project.
        </div>
      </main>
    );
  }
}
