const text = (
  <>
    <b>End User Licence Agreement</b>
    <p>
      This End User Licence Agreement ("EULA") is a legal agreement between you
      and Sirius Business Ltd. for the use of the mobile application Iris. By
      installing, accessing, or using our application, you agree to be bound by
      the terms and conditions of this EULA. If you do not agree to this EULA,
      you may not use our Application.
    </p>

    <p>
      You agree not to use Iris for Prohibited Content or Conduct that includes,
      but is not limited to:
    </p>
    <ul>
      <li>
        impersonate, harass or bully others, harmful to minors, incite or
        promote hate speech, illegal;
      </li>
      <li>
        obscene, sexually explicit, offensive, defamatory, libellous,
        slanderous, violent and/or unlawful content or profanity;
      </li>
      <li>
        content that infringes upon the rights of any third party, including
        copyright, trademark, privacy, publicity or other personal or
        proprietary rights, or that is deceptive or fraudulent;
      </li>
      <li>
        content that promotes the use or sale of illegal or regulated
        substances, tobacco products, ammunition and/or firearms; and
      </li>
      <li>illegal content related to gambling.</li>
    </ul>
    <p>
      Any violation of this EULA, including the Prohibited Content and Conduct
      outlined above, may result in the termination of your access to our
      application.
    </p>
    <p>
      Our application is provided "as is" and "as available" without warranty of
      any kind, either express or implied, including but not limited to the
      implied warranties of merchantability and fitness for a particular
      purpose. We do not guarantee that our application will be uninterrupted or
      error-free. In no event shall Sirius Business Ltd. be liable for any
      damages whatsoever, including but not limited to direct, indirect,
      special, incidental, or consequential damages, arising out of or in
      connection with the use or inability to use our application.
    </p>
    <p>
      We reserve the right to modify this EULA at any time and without prior
      notice. Your continued use of the app after the posting of any modified
      EULA indicates your acceptance of the terms of the modified EULA.
    </p>
    <p>
      If you have any questions about this EULA, please contact us at
      sirius@iris.to.
    </p>
  </>
);

type Props = {
  onAccept: () => void;
  onDecline: () => void;
};

export default function EULA({ onAccept, onDecline }: Props) {
  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-auto bg-black bg-opacity-50">
      <div className="p-4 bg-black rounded-lg">
        <div>{text}</div>
        <p className="flex justify-end mt-4 space-x-2">
          <button className="btn" onClick={onDecline}>
            Decline
          </button>
          <button className="btn btn-primary" onClick={onAccept}>
            Accept
          </button>
        </p>
      </div>
    </div>
  );
}
