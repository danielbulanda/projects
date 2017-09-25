defmodule CardsTest do
  use ExUnit.Case
  doctest Cards

  test "create deck of 20 cards" do
     len = length(Cards.create_deck)
     assert len == 20
  end  
   
   test "shuffling a deck randomizes it" do
      deck = Cards.create_deck
      refute deck == Cards.shuffle deck
   end
end
