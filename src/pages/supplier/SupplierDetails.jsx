import { useRef } from 'react';

const SupplierDetails = () => {
  const profileRef = useRef(null);
  const addressRef = useRef(null);
  const productsRef = useRef(null);
  const servicesRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className='container mt-4'>
      <div className='row'>
        {/* Sidebar */}
        <div
          className='col-md-3 position-fixed'
          style={{ height: '100vh', overflowY: 'auto' }}
        >
          <div className='list-group'>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(profileRef)}
            >
              Profile
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(addressRef)}
            >
              Address
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(productsRef)}
            >
              Products
            </button>
            <button
              className='list-group-item list-group-item-action'
              onClick={() => handleScroll(servicesRef)}
            >
              Services
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className='col-md-9 offset-md-3 gap-2'>
          <div ref={profileRef} className='p-3 border rounded mb-4 bg-light'>
            <h3>Profile</h3>
            <p>
              Supplier profile details go here. Lorem ipsum dolor sit amet,
              consectetur adipisicing elit. Reprehenderit dignissimos ratione
              provident culpa voluptatum et minima quibusdam consequatur odio
              dolorum. Voluptatibus voluptatum molestias earum eveniet, quaerat
              consequatur exercitationem praesentium rem. Odio qui culpa omnis
              rerum ducimus ipsam fugit odit blanditiis quaerat cumque magnam
              nulla numquam, maxime iure ipsum, alias dolorum et id tempore illo
              voluptatum, optio laborum? Perferendis, mollitia enim. Optio dolor
              quae, tempora fugit assumenda eligendi soluta officia maiores,
              molestias quisquam, laboriosam nam aliquam aut facilis magni! Non
              illum voluptate dolorem repudiandae quasi architecto ducimus a
              alias, veniam minima! Optio, laborum commodi? Recusandae sint
              saepe modi laboriosam odio excepturi id fugit voluptates deserunt
              laborum ab, labore temporibus sunt at corporis! Suscipit ipsum
              quia nihil pariatur rerum iste numquam! Repellat. Natus asperiores
              ex doloribus in provident aspernatur quis ipsam consequatur eos,
              beatae iste voluptatem ad corporis similique iusto libero. Est
              veniam aliquam voluptatem pariatur magnam deleniti numquam non
              necessitatibus ullam. Ex odit libero unde laboriosam laudantium
              expedita ratione ut id magni minus, nesciunt quas quis esse eaque
              fugiat, est veniam aliquid quia doloribus mollitia fuga quaerat.
              Temporibus cumque corrupti fugiat! Accusamus dolor non odit porro
              praesentium, quos alias nobis nostrum ipsam magni reprehenderit
              eaque rem laborum? Sit quod error aliquid iure totam debitis
              libero veniam possimus fugiat! Pariatur, similique cum? Nobis,
              dolorem! Temporibus in dolorem quidem? Eius, corporis eligendi
              laudantium deserunt distinctio reprehenderit magni voluptatibus
              vero aperiam, ratione doloribus veritatis inventore, soluta
              repudiandae rem quos voluptas ipsum enim nihil! Excepturi!
              Consequuntur soluta voluptas sit, suscipit porro maxime illo
              doloremque officia incidunt error impedit, veniam quae excepturi,
              perferendis dolor labore exercitationem iure molestias ut ullam
              modi quas quam. Neque, dolore aspernatur? Iure reprehenderit,
              omnis fugiat sint esse ipsum aliquid nemo vel labore nihil
              repudiandae doloremque quos dignissimos vero ea ad magni inventore
              explicabo eveniet iste odit natus accusamus quibusdam unde!
              Provident? Fugiat libero autem nesciunt voluptatum maxime aliquid
              reprehenderit ipsum modi, ea in facere ad. Accusamus quis
              quibusdam aspernatur inventore ipsum dolorum? Ducimus doloribus
              obcaecati ipsam voluptatem? Distinctio quibusdam harum possimus.
              Exercitationem illum dolores architecto velit repellendus eligendi
              obcaecati dignissimos, aperiam debitis dolor numquam eius, maiores
              fuga omnis saepe ea laudantium quod perspiciatis vero nisi
              voluptatibus voluptatem quae. Magnam, saepe perspiciatis. Deleniti
              provident illum delectus sint culpa ad voluptates natus autem rem
              doloremque cupiditate veritatis, expedita nihil. Necessitatibus
              similique soluta incidunt temporibus odio! Similique at quasi
              fugiat ea natus, adipisci eius? Quae tenetur rerum veritatis est
              sit, quas expedita natus. Suscipit praesentium itaque saepe eius.
              Consequatur dolorum accusantium magni? Similique quasi non vel
              laborum? Fugiat non tempore perspiciatis ipsa magni tempora.
              Repellendus dolore consectetur aperiam ipsa nesciunt, doloribus
              iusto cumque autem nulla voluptas laboriosam asperiores alias, eos
              eaque sequi? Cumque minus explicabo molestias quos beatae esse
              eligendi quam fuga praesentium iure! Quam quis asperiores
              incidunt, possimus, ipsam eligendi sequi maxime ea adipisci
              inventore libero expedita provident! Explicabo, placeat quam
              tempora eaque voluptatum ab quaerat nulla atque aliquid laborum
              numquam harum. Tempora. Excepturi doloremque ex, dicta doloribus
              reiciendis nesciunt recusandae perferendis! Impedit dolorem omnis
              illum id! Odio ea, iusto facilis veniam omnis sit error molestias
              laboriosam! Temporibus magnam commodi ducimus fugit vitae? Odit
              repudiandae sed dolorum possimus beatae error nam voluptatibus
              accusamus non ipsam? Illo, voluptatibus enim saepe vel deserunt
              soluta neque, quibusdam fuga vitae quaerat nulla ducimus rem, esse
              consectetur? Quasi. Qui neque aliquid, soluta maiores rerum
              quaerat ex accusantium natus quos incidunt possimus omnis sunt?
              Quo consequatur corporis corrupti saepe repellat? Quis provident
              laborum blanditiis ipsam qui sint nisi nostrum? Enim quaerat
              similique, aut est optio expedita saepe repudiandae adipisci dolor
              laborum necessitatibus omnis voluptates doloribus accusantium vero
              fugiat sapiente, repellat praesentium magni placeat molestias nisi
              corrupti ad! Esse, mollitia?
            </p>
          </div>

          <div ref={addressRef} className='p-3 border rounded mb-4 bg-light'>
            <h3>Address</h3>
            <p>
              Supplier address details go here. consectetur adipisicing elit.
              Reprehenderit dignissimos ratione provident culpa voluptatum et
              minima quibusdam consequatur odio dolorum. Voluptatibus voluptatum
              molestias earum eveniet, quaerat consequatur exercitationem
              praesentium rem. Odio qui culpa omnis rerum ducimus ipsam fugit
              odit blanditiis quaerat cumque magnam nulla numquam, maxime iure
              ipsum, alias dolorum et id tempore illo voluptatum, optio laborum?
              Perferendis, mollitia enim. Optio dolor quae, tempora fugit
              assumenda eligendi soluta officia maiores, molestias quisquam,
              laboriosam nam aliquam aut facilis magni! Non illum voluptate
              dolorem repudiandae quasi architecto ducimus a alias, veniam
              minima! Optio, laborum commodi? Recusandae sint saepe modi
              laboriosam odio excepturi id fugit voluptates deserunt laborum ab,
              labore temporibus sunt at corporis! Suscipit ipsum quia nihil
              pariatur rerum iste numquam! Repellat. Natus asperiores ex
              doloribus in provident aspernatur quis ipsam consequatur eos,
              beatae iste voluptatem ad corporis similique iusto libero. Est
              veniam aliquam voluptatem pariatur magnam deleniti numquam non
              necessitatibus ullam. Ex odit libero unde laboriosam laudantium
              expedita ratione ut id magni minus, nesciunt quas quis esse eaque
              fugiat, est veniam aliquid quia doloribus mollitia fuga quaerat.
              Temporibus cumque corrupti fugiat! Accusamus dolor non odit porro
              praesentium, quos alias nobis nostrum ipsam magni reprehenderit
              eaque rem laborum? Sit quod error aliquid iure totam debitis
              libero veniam possimus fugiat! Pariatur, similique cum? Nobis,
              dolorem! Temporibus in dolorem quidem? Eius, corporis eligendi
              laudantium deserunt distinctio reprehenderit magni voluptatibus
              vero aperiam, ratione doloribus veritatis inventore, soluta
              repudiandae rem quos voluptas ipsum enim nihil! Excepturi!
              Consequuntur soluta voluptas sit, suscipit porro maxime illo
              doloremque officia incidunt error impedit, veniam quae excepturi,
              perferendis dolor labore exercitationem iure molestias ut ullam
              modi quas quam. Neque, dolore aspernatur? Iure reprehenderit,
              omnis fugiat sint esse ipsum aliquid nemo vel labore nihil
              repudiandae doloremque quos dignissimos vero ea ad magni inventore
              explicabo eveniet iste odit natus accusamus quibusdam unde!
              Provident? Fugiat libero autem nesciunt voluptatum maxime aliquid
              reprehenderit ipsum modi, ea in facere ad. Accusamus quis
              quibusdam aspernatur inventore ipsum dolorum? Ducimus doloribus
              obcaecati ipsam voluptatem? Distinctio quibusdam harum possimus.
              Exercitationem illum dolores architecto velit repellendus eligendi
              obcaecati dignissimos, aperiam debitis dolor numquam eius, maiores
              fuga omnis saepe ea laudantium quod perspiciatis vero nisi
              voluptatibus voluptatem quae. Magnam, saepe perspiciatis. Deleniti
              provident illum delectus sint culpa ad voluptates natus autem rem
              doloremque cupiditate veritatis, expedita nihil. Necessitatibus
              similique soluta incidunt temporibus odio! Similique at quasi
              fugiat ea natus, adipisci eius? Quae tenetur rerum veritatis est
              sit, quas expedita natus. Suscipit praesentium itaque saepe eius.
              Consequatur dolorum accusantium magni? Similique quasi non vel
              laborum? Fugiat non tempore perspiciatis ipsa magni tempora.
              Repellendus dolore consectetur aperiam ipsa nesciunt, doloribus
              iusto cumque autem nulla voluptas laboriosam asperiores alias, eos
              eaque sequi? Cumque minus explicabo molestias quos beatae esse
              eligendi quam fuga praesentium iure! Quam quis asperiores
              incidunt, possimus, ipsam eligendi sequi maxime ea adipisci
              inventore libero expedita provident! Explicabo, placeat quam
              tempora eaque voluptatum ab quaerat nulla atque aliquid laborum
              numquam harum. Tempora. Excepturi doloremque ex, dicta doloribus
              reiciendis nesciunt recusandae perferendis! Impedit dolorem omnis
              illum id! Odio ea, iusto facilis veniam omnis sit error molestias
              laboriosam! Temporibus magnam commodi ducimus fugit vitae? Odit
              repudiandae sed dolorum possimus beatae error nam voluptatibus
              accusamus non ipsam? Illo, voluptatibus enim saepe vel deserunt
              soluta neque, quibusdam fuga vitae quaerat nulla ducimus rem, esse
              consectetur? Quasi. Qui neque aliquid, soluta maiores rerum
              quaerat ex accusantium natus quos incidunt possimus omnis sunt?
              Quo consequatur corporis corrupti saepe repellat? Quis provident
              laborum blanditiis ipsam qui sint nisi nostrum? Enim quaerat
              similique, aut est optio expedita saepe repudiandae adipisci dolor
              laborum necessitatibus omnis voluptates doloribus accusantium vero
              fugiat sapiente, repellat praesentium magni placeat molestias nisi
              corrupti ad! Esse, mollitia?
            </p>
          </div>

          <div ref={productsRef} className='p-3 border rounded mb-4 bg-light'>
            <h3>Products</h3>
            <p>
              Supplier product details go here. consectetur adipisicing elit.
              Reprehenderit dignissimos ratione provident culpa voluptatum et
              minima quibusdam consequatur odio dolorum. Voluptatibus voluptatum
              molestias earum eveniet, quaerat consequatur exercitationem
              praesentium rem. Odio qui culpa omnis rerum ducimus ipsam fugit
              odit blanditiis quaerat cumque magnam nulla numquam, maxime iure
              ipsum, alias dolorum et id tempore illo voluptatum, optio laborum?
              Perferendis, mollitia enim. Optio dolor quae, tempora fugit
              assumenda eligendi soluta officia maiores, molestias quisquam,
              laboriosam nam aliquam aut facilis magni! Non illum voluptate
              dolorem repudiandae quasi architecto ducimus a alias, veniam
              minima! Optio, laborum commodi? Recusandae sint saepe modi
              laboriosam odio excepturi id fugit voluptates deserunt laborum ab,
              labore temporibus sunt at corporis! Suscipit ipsum quia nihil
              pariatur rerum iste numquam! Repellat. Natus asperiores ex
              doloribus in provident aspernatur quis ipsam consequatur eos,
              beatae iste voluptatem ad corporis similique iusto libero. Est
              veniam aliquam voluptatem pariatur magnam deleniti numquam non
              necessitatibus ullam. Ex odit libero unde laboriosam laudantium
              expedita ratione ut id magni minus, nesciunt quas quis esse eaque
              fugiat, est veniam aliquid quia doloribus mollitia fuga quaerat.
              Temporibus cumque corrupti fugiat! Accusamus dolor non odit porro
              praesentium, quos alias nobis nostrum ipsam magni reprehenderit
              eaque rem laborum? Sit quod error aliquid iure totam debitis
              libero veniam possimus fugiat! Pariatur, similique cum? Nobis,
              dolorem! Temporibus in dolorem quidem? Eius, corporis eligendi
              laudantium deserunt distinctio reprehenderit magni voluptatibus
              vero aperiam, ratione doloribus veritatis inventore, soluta
              repudiandae rem quos voluptas ipsum enim nihil! Excepturi!
              Consequuntur soluta voluptas sit, suscipit porro maxime illo
              doloremque officia incidunt error impedit, veniam quae excepturi,
              perferendis dolor labore exercitationem iure molestias ut ullam
              modi quas quam. Neque, dolore aspernatur? Iure reprehenderit,
              omnis fugiat sint esse ipsum aliquid nemo vel labore nihil
              repudiandae doloremque quos dignissimos vero ea ad magni inventore
              explicabo eveniet iste odit natus accusamus quibusdam unde!
              Provident? Fugiat libero autem nesciunt voluptatum maxime aliquid
              reprehenderit ipsum modi, ea in facere ad. Accusamus quis
              quibusdam aspernatur inventore ipsum dolorum? Ducimus doloribus
              obcaecati ipsam voluptatem? Distinctio quibusdam harum possimus.
              Exercitationem illum dolores architecto velit repellendus eligendi
              obcaecati dignissimos, aperiam debitis dolor numquam eius, maiores
              fuga omnis saepe ea laudantium quod perspiciatis vero nisi
              voluptatibus voluptatem quae. Magnam, saepe perspiciatis. Deleniti
              provident illum delectus sint culpa ad voluptates natus autem rem
              doloremque cupiditate veritatis, expedita nihil. Necessitatibus
              similique soluta incidunt temporibus odio! Similique at quasi
              fugiat ea natus, adipisci eius? Quae tenetur rerum veritatis est
              sit, quas expedita natus. Suscipit praesentium itaque saepe eius.
              Consequatur dolorum accusantium magni? Similique quasi non vel
              laborum? Fugiat non tempore perspiciatis ipsa magni tempora.
              Repellendus dolore consectetur aperiam ipsa nesciunt, doloribus
              iusto cumque autem nulla voluptas laboriosam asperiores alias, eos
              eaque sequi? Cumque minus explicabo molestias quos beatae esse
              eligendi quam fuga praesentium iure! Quam quis asperiores
              incidunt, possimus, ipsam eligendi sequi maxime ea adipisci
              inventore libero expedita provident! Explicabo, placeat quam
              tempora eaque voluptatum ab quaerat nulla atque aliquid laborum
              numquam harum. Tempora. Excepturi doloremque ex, dicta doloribus
              reiciendis nesciunt recusandae perferendis! Impedit dolorem omnis
              illum id! Odio ea, iusto facilis veniam omnis sit error molestias
              laboriosam! Temporibus magnam commodi ducimus fugit vitae? Odit
              repudiandae sed dolorum possimus beatae error nam voluptatibus
              accusamus non ipsam? Illo, voluptatibus enim saepe vel deserunt
              soluta neque, quibusdam fuga vitae quaerat nulla ducimus rem, esse
              consectetur? Quasi. Qui neque aliquid, soluta maiores rerum
              quaerat ex accusantium natus quos incidunt possimus omnis sunt?
              Quo consequatur corporis corrupti saepe repellat? Quis provident
              laborum blanditiis ipsam qui sint nisi nostrum? Enim quaerat
              similique, aut est optio expedita saepe repudiandae adipisci dolor
              laborum necessitatibus omnis voluptates doloribus accusantium vero
              fugiat sapiente, repellat praesentium magni placeat molestias nisi
              corrupti ad! Esse, mollitia?
            </p>
          </div>

          <div ref={servicesRef} className='p-3 border rounded mb-4 bg-light'>
            <h3>Services</h3>
            <p>
              Supplier service details go here. consectetur adipisicing elit.
              Reprehenderit dignissimos ratione provident culpa voluptatum et
              minima quibusdam consequatur odio dolorum. Voluptatibus voluptatum
              molestias earum eveniet, quaerat consequatur exercitationem
              praesentium rem. Odio qui culpa omnis rerum ducimus ipsam fugit
              odit blanditiis quaerat cumque magnam nulla numquam, maxime iure
              ipsum, alias dolorum et id tempore illo voluptatum, optio laborum?
              Perferendis, mollitia enim. Optio dolor quae, tempora fugit
              assumenda eligendi soluta officia maiores, molestias quisquam,
              laboriosam nam aliquam aut facilis magni! Non illum voluptate
              dolorem repudiandae quasi architecto ducimus a alias, veniam
              minima! Optio, laborum commodi? Recusandae sint saepe modi
              laboriosam odio excepturi id fugit voluptates deserunt laborum ab,
              labore temporibus sunt at corporis! Suscipit ipsum quia nihil
              pariatur rerum iste numquam! Repellat. Natus asperiores ex
              doloribus in provident aspernatur quis ipsam consequatur eos,
              beatae iste voluptatem ad corporis similique iusto libero. Est
              veniam aliquam voluptatem pariatur magnam deleniti numquam non
              necessitatibus ullam. Ex odit libero unde laboriosam laudantium
              expedita ratione ut id magni minus, nesciunt quas quis esse eaque
              fugiat, est veniam aliquid quia doloribus mollitia fuga quaerat.
              Temporibus cumque corrupti fugiat! Accusamus dolor non odit porro
              praesentium, quos alias nobis nostrum ipsam magni reprehenderit
              eaque rem laborum? Sit quod error aliquid iure totam debitis
              libero veniam possimus fugiat! Pariatur, similique cum? Nobis,
              dolorem! Temporibus in dolorem quidem? Eius, corporis eligendi
              laudantium deserunt distinctio reprehenderit magni voluptatibus
              vero aperiam, ratione doloribus veritatis inventore, soluta
              repudiandae rem quos voluptas ipsum enim nihil! Excepturi!
              Consequuntur soluta voluptas sit, suscipit porro maxime illo
              doloremque officia incidunt error impedit, veniam quae excepturi,
              perferendis dolor labore exercitationem iure molestias ut ullam
              modi quas quam. Neque, dolore aspernatur? Iure reprehenderit,
              omnis fugiat sint esse ipsum aliquid nemo vel labore nihil
              repudiandae doloremque quos dignissimos vero ea ad magni inventore
              explicabo eveniet iste odit natus accusamus quibusdam unde!
              Provident? Fugiat libero autem nesciunt voluptatum maxime aliquid
              reprehenderit ipsum modi, ea in facere ad. Accusamus quis
              quibusdam aspernatur inventore ipsum dolorum? Ducimus doloribus
              obcaecati ipsam voluptatem? Distinctio quibusdam harum possimus.
              Exercitationem illum dolores architecto velit repellendus eligendi
              obcaecati dignissimos, aperiam debitis dolor numquam eius, maiores
              fuga omnis saepe ea laudantium quod perspiciatis vero nisi
              voluptatibus voluptatem quae. Magnam, saepe perspiciatis. Deleniti
              provident illum delectus sint culpa ad voluptates natus autem rem
              doloremque cupiditate veritatis, expedita nihil. Necessitatibus
              similique soluta incidunt temporibus odio! Similique at quasi
              fugiat ea natus, adipisci eius? Quae tenetur rerum veritatis est
              sit, quas expedita natus. Suscipit praesentium itaque saepe eius.
              Consequatur dolorum accusantium magni? Similique quasi non vel
              laborum? Fugiat non tempore perspiciatis ipsa magni tempora.
              Repellendus dolore consectetur aperiam ipsa nesciunt, doloribus
              iusto cumque autem nulla voluptas laboriosam asperiores alias, eos
              eaque sequi? Cumque minus explicabo molestias quos beatae esse
              eligendi quam fuga praesentium iure! Quam quis asperiores
              incidunt, possimus, ipsam eligendi sequi maxime ea adipisci
              inventore libero expedita provident! Explicabo, placeat quam
              tempora eaque voluptatum ab quaerat nulla atque aliquid laborum
              numquam harum. Tempora. Excepturi doloremque ex, dicta doloribus
              reiciendis nesciunt recusandae perferendis! Impedit dolorem omnis
              illum id! Odio ea, iusto facilis veniam omnis sit error molestias
              laboriosam! Temporibus magnam commodi ducimus fugit vitae? Odit
              repudiandae sed dolorum possimus beatae error nam voluptatibus
              accusamus non ipsam? Illo, voluptatibus enim saepe vel deserunt
              soluta neque, quibusdam fuga vitae quaerat nulla ducimus rem, esse
              consectetur? Quasi. Qui neque aliquid, soluta maiores rerum
              quaerat ex accusantium natus quos incidunt possimus omnis sunt?
              Quo consequatur corporis corrupti saepe repellat? Quis provident
              laborum blanditiis ipsam qui sint nisi nostrum? Enim quaerat
              similique, aut est optio expedita saepe repudiandae adipisci dolor
              laborum necessitatibus omnis voluptates doloribus accusantium vero
              fugiat sapiente, repellat praesentium magni placeat molestias nisi
              corrupti ad! Esse, mollitia?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupplierDetails;
