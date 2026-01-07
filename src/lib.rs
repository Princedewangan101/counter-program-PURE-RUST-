use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
};

entrypoint!(process_instruction);

fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    _instruction_data: &[u8],
) -> ProgramResult {
    msg!("Program started ->");

    let account_info_iter = &mut accounts.iter();
    let counter_account = next_account_info(account_info_iter)?;

    if counter_account.owner != program_id {
        msg!("Account does not belong to this program");
        return Err(ProgramError::IncorrectProgramId);
    }

    let mut data = counter_account.data.borrow_mut();

    let current = u64::from_le_bytes(data[..8].try_into().unwrap());
    let new_value = current + 1;

    data[..8].copy_from_slice(&new_value.to_le_bytes());

    msg!("Counter increment to {}", new_value);

    Ok(())
}
